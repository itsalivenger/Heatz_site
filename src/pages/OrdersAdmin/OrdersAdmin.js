import { useEffect, useState } from 'react';
import styles from './OrdersAdmin.module.css';
import sendRequest from '../../components/other/sendRequest';
import { serverDomain } from '../../components/other/variables';
import { getTotal, searchItems } from '../../components/other/usefulFunctions';

function OrdersAdmin() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getOrders = async () => {
            const response = await sendRequest(`${serverDomain}/orders`, 'GET');
            setOrders(response.orders || []);
        };
        getOrders();
    }, []);

    async function searchItems() {
        setOrders(searchItems(searchTerm));
    }

    return (
        <div>
            <div className={styles['orders-container']}>
                <span className={styles['orders-title']}>Commandes Actuelles</span>
                <div className={styles['horizental-line']}></div>
                <div className={styles['control-panel']}>
                    <div className={styles['orders-search-container']}>
                        <input
                            className={styles['orders-search']}
                            type="text"
                            placeholder="Rechercher par commande ou client."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={searchItems} className={styles['orders-search-btn']}>Rechercher</button>
                    </div>
                    <select className={styles['orders-filter']}>
                        <option className={styles['orders-option']} value="0">Filtrer par</option>
                        <option className={styles['orders-option']} value="1">Nom du client</option>
                        <option className={styles['orders-option']} value="2">Montant</option>
                        <option className={styles['orders-option']} value="3">Statut</option>
                        <option className={styles['orders-option']} value="4">Date</option>
                    </select>
                </div>
                <div className={styles['orders-table-wrapper']}>
                    <table className={styles['orders-table']}>
                        <thead>
                            <tr>
                                <th>ID Commande</th>
                                <th>Nom du Client</th>
                                <th>Date</th>
                                <th>Montant</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length && orders.map((order) => (
                                <Order key={order._id} order={order} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function Order({ order }) {
    return (
        <tr>
            <td>#{order._id}</td>
            <td>{order.userInfo.firstName} {order.userInfo.lastName}</td>
            <td>{order.createdAt}</td>
            <td>{getTotal(order.cart)} Dh</td>
            <td>{order.status}</td>
            <td className={styles['actions']}>
                <button className={styles['actions-buttons']}><i className="fa fa-eye"></i></button>
                <button className={styles['actions-buttons']}><i className="fa fa-trash"></i></button>
            </td>
        </tr>
    );
}

export default OrdersAdmin;
