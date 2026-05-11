export default function Footer() {
  return (
    <footer className="text-center py-6 px-8 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
      © {new Date().getFullYear()} <span className="text-blue-600 font-semibold">The Blog</span> — All rights reserved
    </footer>
  );
}
