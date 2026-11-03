"use client";

import useFormQuery from "../hooks/useQuery";
import type { EducationalResourceResult } from "../interface/education-resource/educational-resources.interface";
import type { OrganizationResult } from "../interface/organization/organization.interface";

export default function PageUI() {
  const {
    data: organizationData,
    isLoading: organizationLoading,
    error: organizationError,
  } = useFormQuery<OrganizationResult>({
    key: ["Organizations"],
    url: "https://dost-server-git-development-joshuaramins-projects.vercel.app/maintenance/organization",
  });

  const {
    data: educationalResourceData,
    isLoading: educationLoading,
    error: educationError,
  } = useFormQuery<EducationalResourceResult>({
    key: ["EducationalResources"],
    url: "https://dost-server-git-development-joshuaramins-projects.vercel.app/maintenance/educational-resource",
    params: {
      status: "PUBLISHED",
    },
  });

  if (organizationLoading || educationLoading) {
    return <div>Loading...</div>;
  }

  if (organizationError || educationError) {
    return (
      <div>
        <p>Failed to load data.</p>
        <p>{organizationError?.message}</p>
        <p>{educationError?.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        Educational Resources: {educationalResourceData?.data.totalCount ?? 0}
      </div>

      <div>Organizations: {organizationData?.data.totalCount ?? 0}</div>
    </div>
  );
}
