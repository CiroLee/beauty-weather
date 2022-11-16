import React, { FC, useState } from 'react';
import CityList from '@/components/business/CityList';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/Icon';
import { searchCity } from '@/services/weather-service';
import classNames from 'classnames/bind';
import style from './style/index.module.scss';
import { ILocation } from '@/types/weather';
import WeatherPreviewModal from '@/components/business/WeatherPreviewModal';

const cx = classNames.bind(style);
const List: FC = () => {
  const [value, setValue] = useState('');
  const [showPreviewModal, togglePreview] = useState(false);
  const [selectedCity, setSelectedCity] = useState({ name: '', location: '' });
  const [isEmpty, setEmpty] = useState(false);
  const [list, setList] = useState<ILocation[]>([]);
  const navigate = useNavigate();
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const clearValue = () => {
    setValue('');
    setEmpty(false);
    setList([]);
  };
  const handleSearch = async () => {
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

  const chooseCity = (item: ILocation) => {
    setSelectedCity({
      name: item.name,
      location: item.id,
    });
    togglePreview(true);
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
          {value.length ? (
            <Icon
              className={cx('list__search--clear')}
              type="ri"
              name="close-circle-fill"
              size="20px"
              onClick={clearValue}
            />
          ) : null}
        </div>
        <Icon type="ri" name="search-2-line" size="26px" onClick={handleSearch} />
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
      <>{!isEmpty && !list.length ? <CityList /> : null}</>
      {showPreviewModal ? <WeatherPreviewModal {...selectedCity} onShow={togglePreview} /> : null}
    </div>
  );
};

export default List;
