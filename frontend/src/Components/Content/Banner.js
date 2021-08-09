import { Breadcrumb } from 'antd';
import ThunkableLogo from '../../Assets/ThunkableBeaver.png';

export const Banner = () => {
  return (
    <div>
      <Breadcrumb style={{ margin: 24 }}>
        <Breadcrumb.Item>
          <img src={ThunkableLogo} alt='Thunkable Beaver'></img>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};
