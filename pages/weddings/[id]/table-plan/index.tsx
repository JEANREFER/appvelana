// pages/weddings/[id]/table-plan/index.tsx
import dynamic from 'next/dynamic';

const TablePlanPage = dynamic(() => import('@/components/table-plan/TablePlanPage'), {
  ssr: false,
});

export default TablePlanPage;

// Empêche Next.js de faire du prerendering
export const getServerSideProps = async () => {
  return { props: {} };
};
