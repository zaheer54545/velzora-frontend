"use client";

/**
 * Thin navigation layer on top of the Next.js App Router.
 *
 * The original app was written against react-router-dom. Next.js has no
 * one-to-one equivalent for a few of those hooks (`useNavigate`,
 * `useLocation`, a *writable* `useSearchParams`, `NavLink`, `<Navigate />`),
 * so they are provided here with the same call signatures. Every component
 * keeps its existing logic and only the import path changes.
 *
 * `Link` is NOT wrapped: components use `next/link` directly (`href`).
 */

import { useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";

const safeDecode = (value) => {
  if (typeof value !== "string") return value;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

/** Route params (`/product/[slug]` -> { slug }), URL-decoded like react-router. */
export function useParams() {
  const params = useNextParams() || {};

  return useMemo(() => {
    const decoded = {};
    Object.keys(params).forEach((key) => {
      const value = params[key];
      decoded[key] = Array.isArray(value)
        ? value.map(safeDecode)
        : safeDecode(value);
    });
    return decoded;
  }, [params]);
}

/** navigate("/path", { replace }) | navigate(-1) */
export function useNavigate() {
  const router = useRouter();

  return useCallback(
    (to, options = {}) => {
      if (typeof to === "number") {
        if (to !== 0) window.history.go(to);
        return;
      }

      if (options.replace) router.replace(to);
      else router.push(to);
    },
    [router],
  );
}

/** { pathname, search, hash } of the current URL. */
export function useLocation() {
  const pathname = usePathname() || "/";
  const searchParams = useNextSearchParams();
  const query = searchParams ? searchParams.toString() : "";
  const hash = typeof window === "undefined" ? "" : window.location.hash;

  return useMemo(
    () => ({
      pathname,
      search: query ? `?${query}` : "",
      hash,
      state: null,
      key: `${pathname}?${query}${hash}`,
    }),
    [pathname, query, hash],
  );
}

/**
 * [searchParams, setSearchParams]
 * setSearchParams accepts an object / URLSearchParams / updater function and
 * `{ replace }`. It uses the History API, which Next.js syncs with
 * `usePathname`/`useSearchParams` without a server round trip.
 */
export function useSearchParams() {
  const pathname = usePathname() || "/";
  const searchParams = useNextSearchParams();
  const current = searchParams ? searchParams.toString() : "";

  const params = useMemo(() => new URLSearchParams(current), [current]);

  const setSearchParams = useCallback(
    (next, options = {}) => {
      const resolved = typeof next === "function" ? next(params) : next;
      const nextParams = new URLSearchParams(resolved);
      const qs = nextParams.toString();
      const url = `${pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;

      if (options.replace) window.history.replaceState(null, "", url);
      else window.history.pushState(null, "", url);
    },
    [pathname, params],
  );

  return [params, setSearchParams];
}

/** <NavLink to className={({ isActive }) => ...} end /> */
export function NavLink({ to, end = false, className, children, ...rest }) {
  const pathname = usePathname() || "/";

  const isActive = end
    ? pathname === to
    : pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));

  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <Link
      href={to}
      className={resolvedClassName}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    >
      {typeof children === "function" ? children({ isActive }) : children}
    </Link>
  );
}

/** <Navigate to="/login" replace /> */
export function Navigate({ to, replace = false }) {
  const router = useRouter();

  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [router, to, replace]);

  return null;
}
