import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default () => {
    const router = useRouter();
    const [accountDetails, setAccountDetails] = useState(null);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            const resp = await fetch("/api/account/details", {
                method: "GET"
            }).then(res => res.json());

            setAccountDetails(resp.data);
        }

        fetchAccountDetails();
    }, []);

    return (
        <div>
            <h1>Account Details</h1>
            {accountDetails ? (
                <div>
                    <p>ID: {accountDetails.user.id}</p>
                    <p>Email: {accountDetails.user.email}</p>
                    <p>First Name: {accountDetails.user.firstName}</p>
                    <p>Last Name: {accountDetails.user.lastName}</p>
                    <p>Created At: {accountDetails.user.createdAt}</p>
                    <p>Updated At: {accountDetails.user.updatedAt}</p>
                    <p>OAuth Accounts:</p>
                    <ul>
                        {accountDetails.user.oauthAccounts.map(oauthAccount => (
                            <li key={oauthAccount.id}>
                                <p>ID: {oauthAccount.id}</p>
                                <p>Provider: {oauthAccount.provider}</p>
                                <p>Provider ID: {oauthAccount.providerId}</p>
                                <p>Created At: {oauthAccount.createdAt}</p>
                                <p>Updated At: {oauthAccount.updatedAt}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}