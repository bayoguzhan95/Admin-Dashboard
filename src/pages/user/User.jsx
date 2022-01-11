import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './user.css';

export default function User() {
  let { slug } = useParams();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    const res = await fetch(`https://dummyapi.io/data/v1/user/${slug}`, {
      method: 'GET',
      headers: {
        'app-id': '61bbe05888e226f27068d92e',
      },
    });
    await res.json().then((res) => {
      setUser(res);
      setLoading(false);
    });
  };

  return (
    <div className='user'>
      <div className='userTitleContainer'>
        <h1 className='userTitle'>Edit User</h1>
        <Link to='/newUser'>
          <button className='userAddButton'>Create</button>
        </Link>
      </div>
      <div className='userContainer'>
        <div className='userShow'>
          <div className='userShowTop'>
            <img src={user?.picture} alt='' className='userShowImg' />
            <div className='userShowTopTitle'>
              <span className='userShowUsername'>
                {' '}
                {user?.firstName} {user?.lastName}{' '}
              </span>
              <span className='userShowUserTitle'>Software Engineer</span>
            </div>
          </div>
          <div className='userShowBottom'>
            <span className='userShowTitle'>Account Details</span>
            <div className='userShowInfo'>
              <PermIdentity className='userShowIcon' />
              <span className='userShowInfoTitle'>{slug}</span>
            </div>
            <div className='userShowInfo'>
              <CalendarToday className='userShowIcon' />
              <span className='userShowInfoTitle'> {user?.dateOfBirth} </span>
            </div>
            <span className='userShowTitle'>Contact Details</span>
            <div className='userShowInfo'>
              <PhoneAndroid className='userShowIcon' />
              <span className='userShowInfoTitle'> {user?.phone} </span>
            </div>
            <div className='userShowInfo'>
              <MailOutline className='userShowIcon' />
              <span className='userShowInfoTitle'>
                {' '}
                {user?.firstName}
                {'@gmail.com'}{' '}
              </span>
            </div>
            <div className='userShowInfo'>
              <LocationSearching className='userShowIcon' />
              <span className='userShowInfoTitle'>
                {' '}
                {user?.location?.country} {user?.location?.city}{' '}
              </span>
            </div>
          </div>
        </div>
        <div className='userUpdate'>
          <span className='userUpdateTitle'>Edit</span>
          <form className='userUpdateForm'>
            <div className='userUpdateLeft'>
              <div className='userUpdateItem'>
                <label>Username</label>
                <input type='text' placeholder={user?.firstName} className='userUpdateInput' />
              </div>
              <div className='userUpdateItem'>
                <label>Full Name</label>
                <input type='text' placeholder={`${user?.firstName} ${user?.lastName}`} className='userUpdateInput' />
              </div>
              <div className='userUpdateItem'>
                <label>Email</label>
                <input type='text' placeholder={`${user?.firstName}@gmail.com`} className='userUpdateInput' />
              </div>
              <div className='userUpdateItem'>
                <label>Phone</label>
                <input type='text' placeholder={user?.phone} className='userUpdateInput' />
              </div>
              <div className='userUpdateItem'>
                <label>Address</label>
                <input
                  type='text'
                  placeholder={`${user?.location?.country}} ${user?.location?.city}`}
                  className='userUpdateInput'
                />
              </div>
            </div>
            <div className='userUpdateRight'>
              <div className='userUpdateUpload'>
                <img className='userUpdateImg' src={user?.picture} alt='' />
                <label htmlFor='file'>
                  <Publish className='userUpdateIcon' />
                </label>
                <input type='file' id='file' style={{ display: 'none' }} />
              </div>
              <button className='userUpdateButton'>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
