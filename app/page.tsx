import ClusterVisualizer from '@/components/cluster-visualizer';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Kubernetes Cluster Visualizer</h1>
      <ClusterVisualizer />
    </div>
  );
}