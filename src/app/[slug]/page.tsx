import { notFound } from 'next/navigation';
import DynamicPage, { generateParams } from '../../components/Projects';
import homeLinks from '../../data/homeLinks.json';
import ProjectList from "../../data/projects.json"

export async function generateStaticParams() {
  return generateParams(homeLinks)
  
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const normalizedSlug = slug.startsWith("/")
    ? slug
    : `/${slug}`
  if (slug.startsWith("/")) {
    notFound()
  }
  return <DynamicPage data={homeLinks} slug={slug} />;
}