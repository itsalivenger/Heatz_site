import React from 'react';
// import { CreditCard } from 'lucide-react';
import { OrderItemCard } from './OrderItemCard';
import { OrderStatus } from './OrderStatus';
import OrderSummary from './OrderSummary';
import styles from './OrderDetails.module.css';
import { getTotal } from '../other/usefulFunctions';
import jsPDF from 'jspdf';

export const OrderDetails = ({ order, toggleBack }) => {
  const downloadOrderAsPDF = () => {
    const doc = new jsPDF();

    // Title and Order ID
    doc.setFontSize(18);
    doc.text(`Commande #${order._id}`, 10, 10);

    // Date
    doc.setFontSize(12);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 10, 20);

    // Customer Information
    doc.setFontSize(14);
    doc.text('Informations du client:', 10, 30);
    doc.setFontSize(12);
    doc.text(`Nom Complet: ${order.userInfo.formData.firstName} ${order.userInfo.formData.lastName}`, 10, 40);
    doc.text(`Email: ${order.userInfo.formData.email}`, 10, 50);
    doc.text(`Telephone: ${order.userInfo.formData.phone}`, 10, 60);
    doc.text(`Message du client: ${order.userInfo.formData.notes || 'N/A'}`, 10, 70);

    // Address
    doc.setFontSize(14);
    doc.text('Adresse de livraison:', 10, 80);
    doc.setFontSize(12);
    doc.text(order.userInfo.formData.address, 10, 90);
    doc.text(`${order.userInfo.formData.city}, ${order.userInfo.formData.apartment} ${order.userInfo.formData.postalCode}`, 10, 100);

    // Items
    doc.setFontSize(14);
    doc.text('Articles:', 10, 110);
    order.cart.forEach((item, index) => {
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. ${item.productName} - Quantity: ${item.quantity} - Price: ${item.price.toFixed(2)} DH`,
        10,
        120 + index * 10
      );
    });

    // Summary
    const yOffset = 120 + order.cart.length * 10 + 10;
    doc.setFontSize(14);
    doc.text('Résumé de la commande:', 10, yOffset);
    doc.setFontSize(12);
    doc.text(`Sous-total: ${getTotal(order.cart).toFixed(2)} DH`, 10, yOffset + 10);
    doc.text(`Frais de livraison: 0 DH`, 10, yOffset + 20);
    doc.text(`Taxes: 10 DH`, 10, yOffset + 30);
    doc.text(`Total: ${getTotal(order.cart).toFixed(2)} DH`, 10, yOffset + 40);

    // Save the PDF
    doc.save(`Commande_${order._id}.pdf`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.back} onClick={toggleBack}>
        <i className='material-symbols-outlined'>arrow_back</i>
      </div>
      <div>
        <h2 className={styles.title}>Details de la commande</h2>
      </div>
      <div className={styles.header}>
        <div className={styles.orderInfo}>
          <h2 className={styles.orderId}>Commande #{order._id}</h2>
          <p className={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <OrderStatus status={order.status} />
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Articles</h3>
        {order.cart.map((item, index) => (
          <OrderItemCard key={index} item={item} />
        ))}
      </div>

      <OrderSummary
        subtotal={getTotal(order.cart)}
        shippingCost={0}
        tax={10}
        total={getTotal(order.cart)}
      />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Adresse de livraison</h3>
        <div className={styles.address}>
          <p>{order.userInfo.formData.address}</p>
          <p>
            {order.userInfo.formData.city}, {order.userInfo.formData.apartement}{' '}
            {order.userInfo.formData.postalCcode}
          </p>
          {/* <p>{order.userInfo.formData.country}</p> */}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Informations du client</h3>
        <div className={styles.address}>
          <p>Nom Complet: <span className={styles.userInfo}>{order.userInfo.formData.firstName + order.userInfo.formData.lastName}</span></p>
          <p>Email: <span className={styles.userInfo}>{order.userInfo.formData.email}</span></p>
          <p>Telephone: <span className={styles.userInfo}>{order.userInfo.formData.phone}</span></p>
          <p>
            Message du client: <span className={styles.userInfo}>{order.userInfo.formData.notes}</span>
          </p>
          <p>Date: <span className={styles.userInfo}>{order.createdAt}</span></p>
        </div>
      </div>
      <div className={styles.printBtnContainer}>
        <button onClick={downloadOrderAsPDF} className={styles.printOrderBtn}>Telecharger la commande</button>
      </div>
    </div>
  );
};
