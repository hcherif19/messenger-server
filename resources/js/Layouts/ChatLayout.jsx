import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    console.log("conversations", conversations);
    console.log("selectedConversation", selectedConversation);
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});
    const isUserOnline = (userId) => onlineUsers[userId];
    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations]);

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                return new Date(b.updated_at) - new Date(a.updated_at);
            })
        );
    }, [localConversations]);
    
    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                console.log("here", users);
                const onlineUsersObject = Object.fromEntries(
                    users.map((user) => [user.id, user])
                );
                setOnlineUsers((prevOnlineUsers) => {
                    return { ...prevOnlineUsers, ...onlineUsersObject };
                });
            })
            .joining((user) => {
                console.log("joining", user);

                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    updatedUsers[user.id] = user; // add the new user to the list
                    return updatedUsers;
                });
            })
            .leaving((user) => {
                console.log("leaving", user);

                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    delete updatedUsers[user.id]; // remove the user from the list
                    return updatedUsers;
                });
            })
            .error((error) => {
                console.error("error : ", error);
            });
        return () => {
            Echo.leave("online");
        };
    }, []);
    return (
        <AuthenticatedLayout>
            ChatLayout
            <div>{children}</div>
        </AuthenticatedLayout>
    );
};

export default ChatLayout;
