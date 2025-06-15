
"use client";

import type { MenuItemType, CustomizationOption, CustomizationOptionChoice, SelectedCustomization } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useCartStore } from '@/hooks/useCartStore.tsx';
import { useToast } from '@/hooks/use-toast';
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';

interface ItemCustomizationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  item: MenuItemType;
}

export default function ItemCustomizationDialog({ isOpen, onOpenChange, item }: ItemCustomizationDialogProps) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | string[]>>({});
  const [currentPrice, setCurrentPrice] = useState(item.price);

  useEffect(() => {
    // Initialize selectedOptions with default/required values
    const initialSelections: Record<string, string | string[]> = {};
    item.customizationOptions?.forEach(opt => {
      if (opt.required && opt.choices.length > 0) {
        if (opt.type === 'radio' || opt.type === 'select') {
          initialSelections[opt.id] = opt.choices[0].name;
        }
      }
    });
    setSelectedOptions(initialSelections);
  }, [item, isOpen]);
  
  useEffect(() => {
    let price = item.price;
    item.customizationOptions?.forEach(opt => {
      const selection = selectedOptions[opt.id];
      if (selection) {
        if (Array.isArray(selection)) { // Checkbox
          selection.forEach(selName => {
            const choice = opt.choices.find(c => c.name === selName);
            if (choice) price += choice.priceModifier;
          });
        } else { // Radio or Select
          const choice = opt.choices.find(c => c.name === selection);
          if (choice) price += choice.priceModifier;
        }
      }
    });
    setCurrentPrice(price);
  }, [selectedOptions, item]);

  const handleOptionChange = (optionId: string, value: string, type: 'radio' | 'select' | 'checkbox') => {
    setSelectedOptions(prev => {
      const newSelections = { ...prev };
      if (type === 'checkbox') {
        const currentSelection = (newSelections[optionId] as string[] | undefined) || [];
        if (currentSelection.includes(value)) {
          newSelections[optionId] = currentSelection.filter(v => v !== value);
        } else {
          newSelections[optionId] = [...currentSelection, value];
        }
      } else {
        newSelections[optionId] = value;
      }
      return newSelections;
    });
  };

  const handleConfirmAddToCart = () => {
    // Validate required options
    for (const opt of item.customizationOptions || []) {
      if (opt.required && !selectedOptions[opt.id]?.length) {
         toast({
          title: "Missing selection",
          description: `Please select an option for ${opt.name}.`,
          variant: "destructive",
        });
        return;
      }
    }

    const finalCustomizations: SelectedCustomization[] = [];
    Object.entries(selectedOptions).forEach(([optionId, selection]) => {
      const opt = item.customizationOptions?.find(o => o.id === optionId);
      if (opt) {
        if (Array.isArray(selection)) {
          selection.forEach(selName => {
            const choice = opt.choices.find(c => c.name === selName);
            if (choice) {
              finalCustomizations.push({ optionId, optionName: opt.name, choiceName: choice.name, priceModifier: choice.priceModifier });
            }
          });
        } else {
          const choice = opt.choices.find(c => c.name === selection);
          if (choice) {
            finalCustomizations.push({ optionId, optionName: opt.name, choiceName: choice.name, priceModifier: choice.priceModifier });
          }
        }
      }
    });
    
    addToCart(item, 1, finalCustomizations);
    toast({
      title: `${item.name} added to cart!`,
      description: "Customizations applied.",
      variant: "default",
    });
    onOpenChange(false);
    setSelectedOptions({}); // Reset for next time
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Customize {item.name}</DialogTitle>
          <DialogDescription>
            Make it just the way you like it. Base price: ₹{item.price.toFixed(0)}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-grow pr-6 -mr-6">
          <div className="space-y-6 py-4">
            {item.customizationOptions?.map((opt: CustomizationOption) => (
              <div key={opt.id} className="space-y-2 border-b pb-4 last:border-b-0 last:pb-0">
                <Label className="text-md font-semibold">{opt.name}{opt.required && <span className="text-destructive">*</span>}</Label>
                {opt.type === 'radio' && (
                  <RadioGroup
                    value={selectedOptions[opt.id] as string || ''}
                    onValueChange={(value) => handleOptionChange(opt.id, value, 'radio')}
                  >
                    {opt.choices.map((choice: CustomizationOptionChoice) => (
                      <div key={choice.name} className="flex items-center space-x-2">
                        <RadioGroupItem value={choice.name} id={`${opt.id}-${choice.name}`} />
                        <Label htmlFor={`${opt.id}-${choice.name}`} className="flex-grow cursor-pointer">
                          {choice.name} 
                          {choice.priceModifier !== 0 && (
                            <span className="text-sm text-muted-foreground ml-1">
                              ({choice.priceModifier > 0 ? '+' : ''}₹{choice.priceModifier.toFixed(0)})
                            </span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                {opt.type === 'checkbox' && (
                  <div className="space-y-2">
                    {opt.choices.map((choice: CustomizationOptionChoice) => (
                      <div key={choice.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${opt.id}-${choice.name}`}
                          checked={(selectedOptions[opt.id] as string[] | undefined)?.includes(choice.name)}
                          onCheckedChange={() => handleOptionChange(opt.id, choice.name, 'checkbox')}
                        />
                        <Label htmlFor={`${opt.id}-${choice.name}`} className="flex-grow cursor-pointer">
                          {choice.name}
                          {choice.priceModifier !== 0 && (
                            <span className="text-sm text-muted-foreground ml-1">
                              (+₹{choice.priceModifier.toFixed(0)})
                            </span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="mt-auto pt-4 border-t">
          <div className="flex justify-between items-center w-full">
            <p className="text-xl font-bold">Total: ₹{currentPrice.toFixed(0)}</p>
            <Button onClick={handleConfirmAddToCart} size="lg">Add to Cart</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
