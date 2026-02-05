import Link from "next/link";

export function Footer() {
    return (
        <footer className="mt-auto border-t border-minimal">
            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Campus-Hub
                    </p>
                    <div className="flex gap-8">
                        <Link href="/about" className="text-sm text-muted-foreground transition-smooth hover:text-foreground">
                            About
                        </Link>
                        <Link href="/contact" className="text-sm text-muted-foreground transition-smooth hover:text-foreground">
                            Contact
                        </Link>
                        <Link href="/privacy" className="text-sm text-muted-foreground transition-smooth hover:text-foreground">
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
