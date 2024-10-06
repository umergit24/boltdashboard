"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactFlow = dynamic(() => import('reactflow'), { ssr: false });

import 'reactflow/dist/style.css';

const ClusterVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [namespace, setNamespace] = useState('default');
  const [yaml, setYaml] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchClusterData();
  }, []);

  const fetchClusterData = async () => {
    setLoading(true);
    try {
      // Simulated API call
      const response = await fetch('/api/cluster-data');
      const data = await response.json();
      processClusterData(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch cluster data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const processClusterData = (data) => {
    // Process the data and create nodes and edges
    // This is a simplified example
    const newNodes = data.resources.map((resource, index) => ({
      id: resource.name,
      data: { label: resource.name, type: resource.type },
      position: { x: index * 100, y: index * 50 },
    }));

    const newEdges = data.relationships.map((rel, index) => ({
      id: `e${index}`,
      source: rel.from,
      target: rel.to,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleNodeClick = async (event, node) => {
    try {
      // Simulated API call
      const response = await fetch(`/api/resource-yaml?name=${node.id}`);
      const data = await response.json();
      setYaml(data.yaml);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch resource YAML',
        variant: 'destructive',
      });
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    // Apply filtering logic here
  };

  const handleNamespaceChange = (event) => {
    setNamespace(event.target.value);
    // Fetch data for the new namespace
  };

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="flex mb-4 space-x-2">
        <Input
          type="text"
          placeholder="Namespace"
          value={namespace}
          onChange={handleNamespaceChange}
          className="max-w-xs"
        />
        <Select onValueChange={handleFilterChange} defaultValue={filter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter resources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Resources</SelectItem>
            <SelectItem value="pods">Pods</SelectItem>
            <SelectItem value="services">Services</SelectItem>
            <SelectItem value="deployments">Deployments</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={fetchClusterData} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Refresh'}
        </Button>
      </div>
      <Tabs defaultValue="graph" className="w-full">
        <TabsList>
          <TabsTrigger value="graph">Graph View</TabsTrigger>
          <TabsTrigger value="yaml">YAML View</TabsTrigger>
        </TabsList>
        <TabsContent value="graph" className="h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={handleNodeClick}
            fitView
          />
        </TabsContent>
        <TabsContent value="yaml">
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto h-full">
            {yaml || 'Select a resource to view its YAML'}
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClusterVisualizer;