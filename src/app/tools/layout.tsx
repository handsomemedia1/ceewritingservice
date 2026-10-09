import React from 'react';
import ToolsWorkspaceLayout from '@/features/tools/components/ToolsWorkspaceLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolsWorkspaceLayout>{children}</ToolsWorkspaceLayout>;
}
