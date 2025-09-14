import ShoppingCart from '../ShoppingCart';
import programmingThumbnail from '@assets/generated_images/Programming_course_thumbnail_d1dd9e63.png';
import marketingThumbnail from '@assets/generated_images/Digital_marketing_course_thumbnail_00effed1.png';

export default function ShoppingCartExample() {
  const mockItems = [
    {
      id: '1',
      title: 'Python Programming Bilaaga',
      instructor: 'Ahmed Mohamed',
      price: 29,
      originalPrice: 49,
      thumbnail: programmingThumbnail,
      quantity: 1
    },
    {
      id: '2', 
      title: 'Digital Marketing Asaasiga',
      instructor: 'Fatima Ali',
      price: 39,
      originalPrice: 59,
      thumbnail: marketingThumbnail,
      quantity: 2
    }
  ];

  return (
    <ShoppingCart
      items={mockItems}
      language="so"
      onUpdateQuantity={(id, quantity) => console.log('Update quantity:', id, quantity)}
      onRemoveItem={(id) => console.log('Remove item:', id)}
      onCheckout={() => console.log('Checkout clicked')}
    />
  );
}