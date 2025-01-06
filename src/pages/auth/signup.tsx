import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Image from "next/image";

export default () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .required(),
        username: Yup.string()
            .required()
            .min(4, "Username must be at least 4 characters")
            .max(20, "Username cannot be more than 20 characters"),
        firstName: Yup.string()
            .required(),
        lastName: Yup.string()
            .required(),
        password: Yup.string()
            .required()
    });
    const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(loginSchema) });
    const { errors } = formState;

    async function submitLogin(data) {
        setLoading(true);

        const resp = await fetch("/api/account/signup", {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password
            })
        }).then(resp => resp.json());

        if (resp.status !== "success") {
            setLoading(false);
            return setStatus(resp.message);
        }

        setStatus(resp.message);
        setTimeout(() => router.reload(), 2000);
    }

    return (
        <div className="max-w-6xl py-12 mx-auto">
            <h3 className="text-2xl font-medium">Welcome to vatACARS!</h3>
            <span className="text-zinc-400">Use the form below to create an account with us.</span>

            <div className="mt-12 card bg-zinc-800 min-h-40 w-3/4 px-4 mx-auto">
                <form onSubmit={handleSubmit(submitLogin)} className="w-full px-4 py-6 flex-col space-y-3">
                    <div className="relative flex-col items-center">
                        <div className="h-12">
                            <Image
                                src="/img/vatacars-logo-dark.png"
                                alt="vatACARS Logo"
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="text-center text-zinc-400 font-medium">{status}</div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <input disabled={loading} {...register("username")} autoComplete="off" name="username" type="text" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="Username" />
                            <label htmlFor="username" className="input-floating-label peer-focus:text-zinc-300">Username</label>
                        </div>
                        <div className="relative">
                            <input disabled={loading} {...register("email")} autoComplete="off" name="email" type="email" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="Email Address" />
                            <label htmlFor="email" className="input-floating-label peer-focus:text-zinc-300">Email</label>
                        </div>
                        <div className="relative">
                            <input disabled={loading} {...register("firstName")} autoComplete="off" name="firstName" type="text" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="First Name" />
                            <label htmlFor="firstName" className="input-floating-label peer-focus:text-zinc-300">First Name</label>
                        </div>
                        <div className="relative">
                            <input disabled={loading} {...register("lastName")} autoComplete="off" name="lastName" type="text" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="Last Name" />
                            <label htmlFor="lastName" className="input-floating-label peer-focus:text-zinc-300">Last Name</label>
                        </div>
                        <div className="relative">
                            <input disabled={loading} {...register("password")} autoComplete="off" name="password" type="password" required className="input input-floating peer w-full bg-zinc-800 focus:border focus:border-white" placeholder="Password" />
                            <label htmlFor="password" className="input-floating-label peer-focus:text-zinc-300">Password</label>
                        </div>
                        <div className="relative">
                            <button disabled={loading} type="submit" className="btn inline-flex w-full bg-blue-500 text-slate-100 outline-none hover:bg-blue-400 transition-all duration-200">
                                {loading ? <span className="loading loading-infinity" /> : "Finish"}
                            </button>
                        </div>
                    </div>
                    <span className="text-sm text-zinc-500">
                        By clicking Finish, you agree to our <a href="/terms" className="link link-animated text-blue-400">Terms of Service</a> and <a href="/privacy" className="link link-animated text-blue-400">Privacy Policy</a>.
                    </span>
                    {errors ? (
                        <div className="text-red-500 text-sm">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key].message}</p>
                            ))}
                        </div>
                    ) : null}
                </form>
            </div>
        </div>
    )
}