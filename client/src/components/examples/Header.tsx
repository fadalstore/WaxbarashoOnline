import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      cartItemCount={3}
      userRole="student"
      currentLanguage="so"
      onLanguageChange={(lang) => console.log('Language changed to:', lang)}
    />
  );
}