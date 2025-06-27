import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TableColumn<T = any> {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

interface TableAction<T = any> {
    type: 'edit' | 'delete' | 'custom';
    href?: string | ((item: T) => string);
    onClick?: (item: T) => void;
    icon?: React.ReactNode;
    className?: string;
    confirmMessage?: string;
    variant?: 'outline' | 'default' | 'destructive' | 'secondary' | 'ghost' | 'link';
}

interface CrudTableProps<T = any> {
    data: T[];
    columns: TableColumn<T>[];
    actions?: TableAction<T>[];
    emptyMessage?: string;
    emptyMessageWithFilters?: string;
    hasActiveFilters?: boolean;
    className?: string;
}

export function CrudTable<T extends { id: number | string }>({
                                                                 data,
                                                                 columns,
                                                                 actions = [],
                                                                 emptyMessage = "No records found.",
                                                                 emptyMessageWithFilters = "No records found matching your criteria.",
                                                                 hasActiveFilters = false,
                                                                 className
                                                             }: CrudTableProps<T>) {
    const handleAction = (action: TableAction<T>, item: T) => {
        if (action.confirmMessage) {
            if (!confirm(action.confirmMessage)) return;
        }

        if (action.onClick) {
            action.onClick(item);
        }
    };

    const getActionHref = (action: TableAction<T>, item: T): string => {
        if (typeof action.href === 'function') {
            return action.href(item);
        }
        return action.href || '#';
    };

    const getDefaultIcon = (actionType: string) => {
        switch (actionType) {
            case 'edit':
                return <Pencil className="h-4 w-4 text-blue-600" />;
            case 'delete':
                return <Trash className="h-4 w-4 text-red-600" />;
            default:
                return null;
        }
    };

    return (
        <div className={className}>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.key} className={column.className}>
                                {column.header}
                            </TableHead>
                        ))}
                        {actions.length > 0 && (
                            <TableHead className="text-right">Actions</TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.key} className={column.className}>
                                        {column.render
                                            ? column.render(item)
                                            : (item as any)[column.key]
                                        }
                                    </TableCell>
                                ))}
                                {actions.length > 0 && (
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {actions.map((action, index) => (
                                                action.href ? (
                                                    <Link
                                                        key={index}
                                                        className={buttonVariants({
                                                            variant: action.variant || 'outline',
                                                            size: 'sm'
                                                        })}
                                                        href={getActionHref(action, item)}
                                                    >
                                                        {action.icon || getDefaultIcon(action.type)}
                                                    </Link>
                                                ) : (
                                                    <Button
                                                        key={index}
                                                        variant={action.variant || 'outline'}
                                                        size="sm"
                                                        className={action.className}
                                                        onClick={() => handleAction(action, item)}
                                                    >
                                                        {action.icon || getDefaultIcon(action.type)}
                                                    </Button>
                                                )
                                            ))}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                                className="text-center py-8 text-gray-500"
                            >
                                {hasActiveFilters ? emptyMessageWithFilters : emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
