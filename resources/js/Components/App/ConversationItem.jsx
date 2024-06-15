import { Link, usePage } from "@inertiajs/react";
import UserAvatar from "@/Components/UserAvatar";
import GroupAvatar from "@/Components/GroupAvatar";
import UserOptionsDropdown from "@/Components/UserOptionsDropdown";

const ConversationItem = ({
    conversation,
    selectedConversation = null,
    online = null,
}) => {
    const page = usePage();
    const currentUser = page.props.auth.user;
    let classes = "border-transparent";

    if (selectedConversation) {
        if (
            !selectedConversation.is_group &&
            !conversation.is_group &&
            conversation.id == selectedConversation.id
        ) {
            classes = "border-blue-500 bg-black/20";
        }
        if (
            selectedConversation.is_group &&
            conversation.is_group &&
            conversation.id == selectedConversation.id
        ) {
            classes = "border-blue-500 bg-black/20";
        }
    }
    return (
        <Link
            href={
                conversation.is_group
                    ? route("chat.group", conversation)
                    : route("chat.user", conversation)
            }
            preserveState
            className={
                "conversation-item flex items-center gap-2 p-2 text-gray-300 transition-all cursor-pointer border-l-4 hover:border-black/30" +
                classes +
                (conversation.is_user && currentUser.is_admin ?"pr-2": "pr-4")
            }
        >
            {
                conversation.is_user &&(
                    <UserAvatar
                        user={conversation}
                        online={online}
                        className="w-12 h-12"
                    />
                )
            }
            {
                conversation.is_group &&(
                    <GroupAvatar />
                )
            }
        </Link>
    );
};
export default ConversationItem;
