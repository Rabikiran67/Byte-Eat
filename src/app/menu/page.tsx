
"use client";

import MenuItemCard from '@/components/menu/MenuItemCard';
import { menuData } from '@/data/menuData';
import type { MenuItemType } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allPossibleCategories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(menuData.map(item => item.category)));
    return ['all', ...uniqueCategories.sort()];
  }, []);

  const filteredMenu = useMemo(() => {
    return menuData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categoriesToDisplay = useMemo(() => {
    if (selectedCategory === 'all') {
      const uniqueCategoriesInFilteredMenu = Array.from(new Set(filteredMenu.map(item => item.category)));
      return uniqueCategoriesInFilteredMenu.sort();
    }
    if (filteredMenu.length > 0) {
        return [selectedCategory];
    }
    return [];
  }, [filteredMenu, selectedCategory]);

  // Approximate header heights for sticky calculation
  // Mobile header: py-2 (16px total) + icon (28px) + some buffer ~ 52px
  // Desktop header: py-3 (24px total) + icon (32px) + some buffer ~ 68px
  const mobileHeaderHeight = '52px';
  const desktopHeaderHeight = '68px';


  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary mb-1 sm:mb-2">Our Menu</h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Discover a variety of delicious dishes crafted with the freshest ingredients.
        </p>
      </div>

      <div 
        className="sticky z-40 bg-background/80 backdrop-blur-md p-2 sm:p-4 rounded-lg shadow-md -mx-2 md:mx-0"
        style={{ top: `calc(var(--header-height-mobile, ${mobileHeaderHeight}) + 0.5rem)` }}
      >
        {/* Fallback for desktop if CSS var isn't perfectly set by JS, or use media query for 'top' if more precision needed */}
        <style jsx>{`
          @media (min-width: 640px) { /* sm breakpoint */
            div[style*="--header-height-mobile"] {
              top: calc(var(--header-height-desktop, ${desktopHeaderHeight}) + 1rem) !important;
            }
          }
        `}</style>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 sm:pl-10 w-full h-10 sm:h-auto"
              aria-label="Search menu items"
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground hidden sm:block" />
             <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px] h-10 sm:h-auto text-sm sm:text-base" aria-label="Filter by category">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {allPossibleCategories.map(category => (
                  <SelectItem key={category} value={category} className="capitalize text-sm sm:text-base">
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredMenu.length > 0 ? (
        categoriesToDisplay.map(categoryName => {
          const itemsForThisCategory = selectedCategory === 'all' 
            ? filteredMenu.filter(item => item.category === categoryName)
            : filteredMenu;

          if (itemsForThisCategory.length === 0) return null;

          return (
            <div key={categoryName} className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-semibold font-headline text-accent border-b-2 border-accent/30 pb-1 sm:pb-2 capitalize">
                {categoryName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {itemsForThisCategory.map((item: MenuItemType) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-8 sm:py-12">
          <Search className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-3 sm:mb-4" />
          <p className="text-lg sm:text-xl text-muted-foreground">No menu items match your search or filter.</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Try adjusting your search term or category filter.</p>
        </div>
      )}
    </div>
  );
}
