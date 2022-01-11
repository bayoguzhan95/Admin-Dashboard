import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const res = await fetch(`https://dummyapi.io/data/v1/user?page=$1&limit=6`, {
      method: 'GET',
      headers: {
        'app-id': '61bbe05888e226f27068d92e',
      },
    });
    await res.json().then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  };

  return (
    <div className='widgetSm' style={{ position: 'relative' }}>
      <span className='widgetSmTitle'>New Join Members</span>

      {loading && (
        <div style={{ position: 'absolute', left: '40%', top: '40%' }}>
          <CircularProgress />
        </div>
      )}

      {!loading && (
        <ul className='widgetSmList'>
          {users?.map((user) => (
            <li className='widgetSmListItem' key={user.id}>
              <img src={user.picture} alt='' className='widgetSmImg' />
              <div className='widgetSmUser'>
                <span className='widgetSmUsername'>
                  {' '}
                  {user.firstName} {user.lastName}{' '}
                </span>
                <span className='widgetSmUserTitle'>Software Engineer</span>
              </div>
              <button className='widgetSmButton'>
                <Visibility className='widgetSmIcon' />
                Display
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
