import { navigation } from "@/data/datas";
import Link from "next/link";

export const Nav = () => {
    return (
        <nav className="fixed top-0 left-1/2 z-20 mt-5 flex w-fit -translate-x-1/2 justify-center rounded-lg b-[#2b3037] px-5py-2.5">
            <ul className="flex gap-5 text-[#eeebd8]">
                {navigation.map((item) => (
                    <li key={item.name}>
                        <Link href={item.href}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
