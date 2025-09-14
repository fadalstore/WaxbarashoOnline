import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart as CartIcon, X, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  quantity: number;
}

interface ShoppingCartProps {
  items?: CartItem[];
  language?: 'so' | 'en';
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

export default function ShoppingCart({
  items = [],
  language = 'so',
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onCheckout = () => {}
}: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalOriginalPrice = items.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) * item.quantity), 0
  );
  const savings = totalOriginalPrice - totalPrice;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      onRemoveItem(id);
    } else {
      onUpdateQuantity(id, newQuantity);
    }
    console.log('Quantity changed for:', id, 'to:', newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    onRemoveItem(id);
    console.log('Removed item:', id);
  };

  const handleCheckout = () => {
    onCheckout();
    setIsOpen(false);
    console.log('Proceeding to checkout');
  };

  const texts = {
    so: {
      title: "Kaashada",
      empty: "Kaashadaada waa madhan tahay",
      emptyDescription: "Ku dar koorsooyin si aad u bilaawdo barashada",
      continueShopping: "Sii wado iibsashada",
      remove: "Ka saar",
      quantity: "Tirada",
      subtotal: "Walbahaaraha",
      total: "Wadarta",
      savings: "Kaydinta",
      checkout: "Bixinta",
      course: "koorso"
    },
    en: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      emptyDescription: "Add some courses to get started learning",
      continueShopping: "Continue Shopping",
      remove: "Remove",
      quantity: "Quantity",
      subtotal: "Subtotal",
      total: "Total",
      savings: "Savings",
      checkout: "Checkout",
      course: "course"
    }
  };

  const text = texts[language];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          data-testid="button-open-cart"
          variant="ghost" 
          size="icon" 
          className="relative"
        >
          <CartIcon className="w-5 h-5" />
          {items.length > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 min-w-5 h-5 text-xs">
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <CartIcon className="w-5 h-5" />
            {text.title}
            {items.length > 0 && (
              <Badge variant="secondary">
                {items.length} {text.course}{items.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="py-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <CartIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{text.empty}</h3>
              <p className="text-muted-foreground mb-4">{text.emptyDescription}</p>
              <Button onClick={() => setIsOpen(false)}>
                {text.continueShopping}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm leading-tight mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {item.instructor}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">
                                ${item.price}
                              </span>
                              {item.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ${item.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Button
                                data-testid={`button-decrease-${item.id}`}
                                variant="outline"
                                size="icon"
                                className="w-6 h-6"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                data-testid={`button-increase-${item.id}`}
                                variant="outline"
                                size="icon"
                                className="w-6 h-6"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          data-testid={`button-remove-${item.id}`}
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              {/* Cart Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{text.subtotal}</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>{text.savings}</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>{text.total}</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                data-testid="button-checkout"
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                {text.checkout}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}