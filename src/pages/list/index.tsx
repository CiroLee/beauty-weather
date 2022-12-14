import React, { FC, useState } from 'react';
import CityList from '@/components/business/CityList';
import Icon from '@/components/Icon';
import WeatherPreviewModal from '@/components/business/WeatherPreviewModal';
import ActionSheet from '@/components/ActionSheet';
import { useNavigate } from 'react-router-dom';
import { useCityStore } from '@/store/weather';
import { searchCity } from '@/services/weather-service';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
import { ILocation } from '@/types/weather';
import Message from '@/components/Message';

const message = new Message();
const cx = classNames.bind(style);
const List: FC = () => {
  const [value, setValue] = useState('');
  const [showPreviewModal, togglePreview] = useState(false);
  const [showActionSheet, setActionSheetShow] = useState(false);
  // 搜索结果选择
  const [selectedCity, setSelectedCity] = useState({ name: '', location: '' });
  // 搜索结果是否为空
  const [isEmpty, setEmpty] = useState(false);
  const [list, setList] = useState<ILocation[]>([]);
  const [operatedCity, setOperatedCity] = useState({ location: '', name: '' });
  const { locations, removeLocation, setAsDefault } = useCityStore((state) => state);
  const actions = [
    {
      id: 'detail',
      text: '查看',
      icon: 'tablet-line',
    },
    {
      id: 'delete',
      text: '删除',
      icon: 'delete-bin-line',
    },
    {
      id: 'default',
      text: '设为默认',
      icon: 'pushpin-2-line',
    },
  ];
  const navigate = useNavigate();
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const clearValue = () => {
    setValue('');
  };
  const cancelSearch = () => {
    setEmpty(false);
    setList([]);
    setValue('');
  };
  const handleSearch = async () => {
    if (!value) return;
    const [list, ok] = await searchCity(value);
    if (ok) {
      if (list) {
        setList(list);
        setEmpty(false);
      } else {
        setList([]);
        setEmpty(true);
      }
    }
  };
  // 按下enter搜索
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() === 'enter' && value) {
      handleSearch();
    }
  };
  // 选择搜索结果中的城市信息去展示
  const chooseCity = (item: ILocation) => {
    setSelectedCity({
      name: item.name,
      location: item.id,
    });
    togglePreview(true);
  };
  // 选择本地城市列表去操作
  const cityItemOnClickHandler = (location: string, name: string) => {
    setActionSheetShow(true);
    setOperatedCity({ location, name });
  };
  // action面板选择处理函数
  const selectedHandler = (id: string) => {
    switch (id) {
      case 'delete':
        if (locations.length === 1) {
          message.warn('不能删除最后一个城市');
          return;
        }
        removeLocation(operatedCity.location);
        break;
      case 'detail':
        navigate(`/?location=${operatedCity.location}`);
        break;
      default:
        if (locations.findIndex((item) => item.location === operatedCity.location) === 0) {
          message.info('当前城市已是默认城市');
          return;
        }
        setAsDefault(operatedCity.location);
    }
  };

  return (
    <div className={cx('list')}>
      <div className={cx('list__search')}>
        <Icon type="ri" name="arrow-left-line" size="26px" onClick={() => navigate(-1)} />
        <div className={cx('list__search-input')}>
          <input
            type="search"
            autoComplete="off"
            value={value}
            onChange={(event) => handleOnChange(event)}
            onKeyDown={(event) => handleKeyDown(event)}
          />
          {value ? (
            <Icon
              className={cx('list__search--clear')}
              type="ri"
              name="close-circle-fill"
              size="20px"
              onClick={clearValue}
            />
          ) : null}
        </div>
        {list.length || isEmpty ? <div onClick={cancelSearch}>取消</div> : null}
      </div>
      <ul className={cx('list__search-result')}>
        {list.map((item) => (
          <li key={item.id} onClick={() => chooseCity(item)}>{`${item.adm2} ${item.adm1} ${item.name}`}</li>
        ))}
        {isEmpty ? (
          <div className={cx('list__empty')}>
            <Icon type="ri" name="search-2-line" size="50px" />
            <p>未搜索到结果</p>
          </div>
        ) : null}
      </ul>
      <div className={cx('list__locals')}>
        {!isEmpty && !list.length ? (
          <CityList onClick={(location, name) => cityItemOnClickHandler(location, name)} />
        ) : null}
      </div>
      {showPreviewModal ? <WeatherPreviewModal {...selectedCity} onShow={togglePreview} /> : null}
      <ActionSheet
        actions={actions}
        show={showActionSheet}
        toggleActionSheet={(show) => setActionSheetShow(show)}
        selected={(id) => selectedHandler(id)}
      />
    </div>
  );
};

export default List;
