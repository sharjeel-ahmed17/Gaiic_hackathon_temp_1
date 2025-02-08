import Link from 'next/link';


const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href='/'>
        
        <h1 className="text-xl font-semibold">MyStore</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-gray-200 transition">Home</Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-gray-200 transition">Cart</Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-gray-200 transition">Checkout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;