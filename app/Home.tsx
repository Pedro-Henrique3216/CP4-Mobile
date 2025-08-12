import ClientProvider from "./ClientProvider";
import ShowUsers from "./ShowUsers";

export default function Home() {
    return (
        <ClientProvider>
            <ShowUsers />
        </ClientProvider>
    );
}
