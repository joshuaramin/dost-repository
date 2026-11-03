"use client";

import React from "react";
import useFormQuery from "../hooks/useQuery";
import { EducationalResourceResult } from "../interface/education-resource/educational-resources.interface";
import { OrganizationResult } from "../interface/organization/organization.interface";

export default function PageUI() {
  const { data: OrganizationData } = useFormQuery<OrganizationResult>({
    key: ["Organizations"],
    url: `${process.env.BASE_URL}/maintenance/organizations`,
  });

  const { data: EducationalResourceData, isLoading: EducationLoading } =
    useFormQuery<EducationalResourceResult>({
      key: ["EducationalResources"],
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/maintenance/educational-resources`,
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
