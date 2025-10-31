import Link from 'next/link';
import { Linkedin, Github, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="border-t py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Favour Timothy</h3>
            <p className="text-muted-foreground">
              Creating beautiful, functional websites and applications with modern technologies.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialLink href="https://github.com/ShunGoes" icon={Github} />
              <SocialLink href="https://www.linkedin.com/in/favour-timothy-234a07182/" icon={Linkedin} />
              <SocialLink href="https://x.com/shunnode" icon={Twitter} />
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/" text="Home" />
              <FooterLink href="/wordpress" text="WordPress Development" />
              <FooterLink href="/fullstack" text="Full Stack Development" />
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>favourkcb@gmail.com</p>
              <p className="mt-2">+234 812 6866 823</p>
              <p className="mt-2">Lagos, Nigeria</p>
            </address>
          </div>
        </div>
        
      
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: React.ElementType }) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "h-10 w-10 flex items-center justify-center rounded-full",
        "bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground",
        "transition-colors duration-200"
      )}
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link 
        href={href}
        className="text-muted-foreground hover:text-primary transition-colors duration-200"
      >
        {text}
      </Link>
    </li>
  );
}