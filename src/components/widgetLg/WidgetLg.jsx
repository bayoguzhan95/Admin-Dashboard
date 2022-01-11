import { LinearProgress } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './widgetLg.css';

export default function WidgetLg() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const res = await fetch(`https://dummyapi.io/data/v1/tag/water/post?limit=5`, {
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

  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>;
  };
  return (
    <div className='widgetLg'>
      <h3 className='widgetLgTitle'>Latest transactions</h3>
      <table className='widgetLgTable'>
        <tr className='widgetLgTr'>
          <th className='widgetLgTh'>Customer</th>
          <th className='widgetLgTh'>Date</th>
          <th className='widgetLgTh'>Amount</th>
          <th className='widgetLgTh'>Status</th>
        </tr>

        {loading && (
          <div className=''>
            <LinearProgress color='secondary' className='circularProgress' />
          </div>
        )}
        {!loading && (
          <>
            {users.map((user) => (
              <tr className='widgetLgTr' key={user.id}>
                <td className='widgetLgUser'>
                  <img src={user.image} alt='' className='widgetLgImg' />
                  <span className='widgetLgName'>
                    {user.owner.firstName} {user.owner.lastName}
                  </span>
                </td>
                <td className='widgetLgDate'> {moment(user.publishDate).format('MMM Do YY')} </td>
                <td className='widgetLgAmount'>${user.likes * 1000} </td>
                <td className='widgetLgStatus'>
                  <Button type='Approved' />
                </td>
              </tr>
            ))}
          </>
        )}
      </table>
    </div>
  );
}
