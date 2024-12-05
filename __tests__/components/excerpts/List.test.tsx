import { render, screen } from '@testing-library/react';
import List from '@/components/excerpts/List';
import type { Excerpt } from '@/lib/constants/definitions';
import { CHUNK_SIZE } from '@/lib/hooks/useInfiniteScroll';

jest.mock('@/lib/hooks/useInfiniteScroll', () => ({
  __esModule: true,
  default: () => ({ current: null }), // Return a mock ref
  CHUNK_SIZE: 10
}));

jest.mock('@/styles', () => ({
  ExcerptLink: ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a href={href} data-testid="excerpt-link">{children}</a>
  )
}));

jest.mock('react-markdown', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: string }) => {
      // Basic markdown processing
      const processedText = children
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      return <div dangerouslySetInnerHTML={{ __html: processedText }} />;
    },
  };
});

describe('List Component', () => {
  const mockExcerpts: Excerpt[] = [
    {
      id: '1',
      author: 'Author 1',
      work: 'Work 1',
      body: 'Excerpt body 1',
      createdAt: '2023-01-01T00:00:00Z'
    },
    {
      id: '2',
      author: 'Author 2',
      work: 'Work 2',
      body: 'Excerpt body 2',
      createdAt: '2023-01-02T00:00:00Z'
    },
    {
      id: '3',
      author: 'Author 3',
      work: 'Work 3',
      body: 'Excerpt body 3',
      createdAt: '2023-01-03T00:00:00Z'
    }
  ];

  it('renders the initial chunk of excerpts', () => {
    render(<List excerpts={mockExcerpts} />);
  
    const links = screen.getAllByTestId('excerpt-link');
  
    // Check if the first CHUNK_SIZE excerpts are rendered
    mockExcerpts.slice(0, CHUNK_SIZE).forEach((excerpt, index) => {
      const link = links[index];
      expect(link).toHaveTextContent(excerpt.author);
      expect(link).toHaveTextContent(excerpt.work);
      expect(screen.getByText(excerpt.body)).toBeInTheDocument();
    });
  });

  it('renders excerpt links with correct hrefs', () => {
    render(<List excerpts={mockExcerpts} />);

    const links = screen.getAllByTestId('excerpt-link');

    // Make sure we have the expected number of links
    expect(links).toHaveLength(mockExcerpts.length);

    mockExcerpts.forEach((excerpt, i) => {
      expect(links[i]).toHaveAttribute('href', `/excerpts/${excerpt.id}`);
    });
  });

  it('shows loading indicator when more excerpts are available', () => {
    const manyExcerpts = Array.from({ length: CHUNK_SIZE + 1 }, (_, i) => ({
      id: `${i + 1}`,
      author: `Author ${i + 1}`,
      work: `Work ${i + 1}`,
      body: `Excerpt body ${i + 1}`,
      createdAt: new Date().toISOString()
    }));

    render(<List excerpts={manyExcerpts} />);

    // Check if LinearProgress is rendered when there are more excerpts
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('does not show loading indicator when all excerpts are displayed', () => {
    const fewExcerpts = Array.from({ length: CHUNK_SIZE - 1 }, (_, i) => ({
      id: `${i + 1}`,
      author: `Author ${i + 1}`,
      work: `Work ${i + 1}`,
      body: `Excerpt body ${i + 1}`,
      createdAt: new Date().toISOString()
    }));

    render(<List excerpts={fewExcerpts} />);

    // Check that LinearProgress is not rendered
    const progressBar = screen.queryByRole('progressbar');
    expect(progressBar).not.toBeInTheDocument();
  });

  it('renders markdown content correctly', () => {
    const excerptWithMarkdown: Excerpt = {
      id: '1',
      author: 'Author 1',
      work: 'Work 1',
      body: '**Bold text** and *italic text*',
      createdAt: '2023-01-01T00:00:00Z'
    };
  
    render(<List excerpts={[excerptWithMarkdown]} />);
  
    // Use getByRole instead of getByText for better element targeting
    const boldElement = screen.getByRole('strong');
    expect(boldElement).toHaveTextContent('Bold text');
  
    const italicElement = screen.getByRole('emphasis');
    expect(italicElement).toHaveTextContent('italic text');
  });

  describe('Item Component', () => {
    it('renders excerpt details correctly', () => {
      const excerpt = {
        id: '1',
        author: 'Author 1',
        work: 'Work 1',
        body: 'Excerpt body 1',
        createdAt: '2023-01-01T00:00:00Z'
      };
      render(<List excerpts={[excerpt]} />);
    
      // Get the link element
      const link = screen.getByTestId('excerpt-link');
    
      // Check that the link contains both author and work
      expect(link).toHaveTextContent(excerpt.author);
      expect(link).toHaveTextContent(excerpt.work);
    
      // Check the link href
      expect(link).toHaveAttribute('href', `/excerpts/${excerpt.id}`);
    
      // Check the excerpt body separately
      expect(screen.getByText(excerpt.body)).toBeInTheDocument();
    });
    
  });
});
