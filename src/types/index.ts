
export interface CustomizationOptionChoice {
  name: string;
  priceModifier: number; // Can be positive or negative
}

export interface CustomizationOption {
  id: string;
  name: string; // e.g., "Size", "Toppings"
  type: 'select' | 'radio' | 'checkbox'; // 'select'/'radio' for single choice, 'checkbox' for multiple
  choices: CustomizationOptionChoice[];
  required?: boolean;
}

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  subcategory?: string;
  customizationOptions?: CustomizationOption[];
  dataAiHint?: string;
}

export interface SelectedCustomization {
  optionId: string;
  optionName: string;
  choiceName: string;
  priceModifier: number;
}

export interface CartItemType extends MenuItemType {
  quantity: number;
  selectedCustomizations?: SelectedCustomization[];
  finalPrice: number; // Price per item after customizations
}
