"use client";

import React from "react";
import useFormQuery from "../hooks/useQuery";
import { EducationalResourceResult } from "../interface/education-resource/educational-resources.interface";
import { OrganizationResult } from "../interface/organization/organization.interface";

export default function PageUI() {
  const { data: OrganizationData } = useFormQuery<OrganizationResult>({
    key: ["Organizations"],
    url: "https://dost-server-git-development-joshuaramins-projects.vercel.app/maintenance/organization",
  });

  const { data: EducationalResourceData, isLoading: EducationLoading } =
    useFormQuery<EducationalResourceResult>({
      key: ["EducationalResources"],
      url: "https://dost-server-git-development-joshuaramins-projects.vercel.app/maintenance/educational-resource",
      params: {
        status: "PUBLISHED",
      },
    });

  return (
    <div>
      <div>
        Educational Resources: {EducationalResourceData?.data.totalCount}
      </div>
      <div>Organizations: {OrganizationData?.data.totalCount}</div>
    </div>
  );
}
