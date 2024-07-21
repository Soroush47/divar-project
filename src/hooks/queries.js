import { useQuery } from "@tanstack/react-query";

import { getCategory } from "src/services/admin";
import { getProfile } from "src/services/user";

const useCategory = () =>
    useQuery({
        queryKey: ["category"],
        queryFn: getCategory,
    });

const useProfile = (enabled = true) =>
    useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        enabled,
    });

export { useCategory, useProfile };
