import { NextResponse } from 'next/server';

export async function GET() {
  // This is a mock implementation. In a real-world scenario,
  // you would interact with the Kubernetes API here.
  const mockClusterData = {
    resources: [
      { name: 'frontend-pod', type: 'Pod' },
      { name: 'backend-pod', type: 'Pod' },
      { name: 'database-pod', type: 'Pod' },
      { name: 'frontend-service', type: 'Service' },
      { name: 'backend-service', type: 'Service' },
      { name: 'database-service', type: 'Service' },
      { name: 'frontend-deployment', type: 'Deployment' },
      { name: 'backend-deployment', type: 'Deployment' },
      { name: 'database-deployment', type: 'Deployment' },
    ],
    relationships: [
      { from: 'frontend-deployment', to: 'frontend-pod' },
      { from: 'backend-deployment', to: 'backend-pod' },
      { from: 'database-deployment', to: 'database-pod' },
      { from: 'frontend-service', to: 'frontend-pod' },
      { from: 'backend-service', to: 'backend-pod' },
      { from: 'database-service', to: 'database-pod' },
    ],
  };

  return NextResponse.json(mockClusterData);
}