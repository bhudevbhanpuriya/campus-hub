import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function LoadingCard() {
    return (
        <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-32" />
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-36" />
                </div>
            </CardContent>
        </Card>
    );
}
