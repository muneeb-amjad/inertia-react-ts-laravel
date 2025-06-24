import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, BriefcaseIcon, Folder, LayoutGrid, UserPlus, Building, Building2, Settings, Timer, Globe, List, Image, FileText, LayoutTemplate, Mail, Sparkles, MessageSquareQuote, PenLine, Tags } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'Frontend Website',
        href: '/',
        icon: Building,
        children: [
            {
                title: 'Brands',
                href: '/brands',
                icon: BriefcaseIcon,
            },
            {
                title: 'Blog Category',
                href: '/blog-categories',
                icon: Tags,
            },
            {
                title: 'Blogs',
                href: '/blogs',
                icon: PenLine,
            },
        ],
    },
    {
        title: 'Company Info',
        href: '/',
        icon: Building,
        children: [
            {
                title: 'Company Details',
                href: '/head-office-details',
                icon: Building2,
            },
            {
                title: 'Staff',
                href: '/staff-users',
                icon: UserPlus,
            },
            {
                title: 'CQC Settings',
                href: '/users/create',
                icon: Settings,
            },
            {
                title: 'Opening Hours',
                href: '/users/create',
                icon: Timer,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
