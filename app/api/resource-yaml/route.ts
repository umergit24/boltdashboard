import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  // This is a mock implementation. In a real-world scenario,
  // you would fetch the actual YAML from the Kubernetes API.
  const mockYaml = `
apiVersion: v1
kind: Pod
metadata:
  name: ${name}
spec:
  containers:
  - name: ${name}-container
    image: nginx:latest
    ports:
    - containerPort: 80
`;

  return NextResponse.json({ yaml: mockYaml });
}