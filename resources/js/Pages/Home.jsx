import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <ChatLayout>
          Messages
        </ChatLayout>
    );
}
