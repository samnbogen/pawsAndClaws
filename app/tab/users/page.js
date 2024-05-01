// page to see list of users

import Header from "@/app/components/header";
import UserList from "./user-list";

export default function Page() {
    return (    
        <main>
            <Header text="Users" />
            <UserList />
        </main>
    );
}