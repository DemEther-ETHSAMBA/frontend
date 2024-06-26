import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { createLink } from "@/helpers";
import type { LoggedInUser } from "@lumx-protocol/embedded-wallet";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useRouter } from "next/navigation";

export const UserNav = ({
  name,
  walletAddress,
}: {
  name: string;
  walletAddress: LoggedInUser["walletAddress"];
}) => {
  const { connect } = useConnect();
  const { address } = useAccount();
  const { push } = useRouter();

  const getInitialLetters = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-[#98C73B] dark:bg-[#98C73B] text-green-secondary">
              {getInitialLetters(name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              className="flex items-center justify-between w-full"
              href={createLink({
                href: "rarible.com",
                path: `user/${walletAddress}/owned`,
                prodSubdomain: "",
                testSubdomain: "testnet.",
              })}
              target="_blank"
            >
              Perfil <ArrowUpRight className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {!address && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => connect({ connector: injected() })}
            >
              Entrar com metamask
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            localStorage.clear();
            document.cookie = `walletId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            push("/");
          }}
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
