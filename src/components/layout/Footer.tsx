
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {currentYear} ByteEat. All rights reserved with RK.
        </p>
        <p className="text-xs mt-1">
          Enjoy your meal!
        </p>
      </div>
    </footer>
  );
}
