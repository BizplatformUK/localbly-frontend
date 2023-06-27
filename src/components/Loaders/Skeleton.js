import React from 'react';

const Skeleton = () => {
  return (
    <ul>
      <li className="skeleton">
          <div className="skeleton__left">
            <div className="skeleton__circle"></div>
            <div className="skeleton__text">
              <div className='skeleton__text__line'></div>
              <div className='skeleton__text__line__one'></div>
            </div>
          </div>
          <div className="skeleton__right">
            <div className="skeleton__button"></div>
            <div className="skeleton__button"></div>
          </div>
      </li>
      <li className="skeleton">
        <div className="skeleton__left">
          <div className="skeleton__circle"></div>
          <div className="skeleton__text">
            <div className='skeleton__text__line'></div>
            <div className='skeleton__text__line__one'></div>
          </div>
        </div>
        <div className="skeleton__right">
          <div className="skeleton__button"></div>
          <div className="skeleton__button"></div>
        </div>
    </li>
    <li className="skeleton">
        <div className="skeleton__left">
          <div className="skeleton__circle"></div>
          <div className="skeleton__text">
            <div className='skeleton__text__line'></div>
            <div className='skeleton__text__line__one'></div>
          </div>
        </div>
        <div className="skeleton__right">
          <div className="skeleton__button"></div>
          <div className="skeleton__button"></div>
        </div>
    </li>
    </ul>
  );
};

export default Skeleton;
