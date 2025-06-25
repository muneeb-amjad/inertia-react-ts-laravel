import { ColumnDef } from "@tanstack/react-table";
import { Brand } from "@/types";
import { router, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const columns: ColumnDef<Brand>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Brand Name",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const brand = row.original;

            const handleDelete = () => {
                if (confirm("Are you sure you want to delete this brand?")) {
                    router.delete(route("brands.destroy", { id: brand.id }));
                    toast.success("Brand Deleted Successfully");
                }
            };

            return (
                <div className="flex gap-2">
                    <Link
                        href={`/brands/${brand.id}/edit`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                        Edit
                    </Link>
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            );
        },
    },
];
