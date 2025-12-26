const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-10 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-400">
            © 2025 HTECO Project. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-bold text-slate-500">
            <Link href="#" className="hover:text-slate-900">Privacy</Link>
            <Link href="#" className="hover:text-slate-900">Terms</Link>
            <Link href="#" className="hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </footer>
    );
}

export default Footer;