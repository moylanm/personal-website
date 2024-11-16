import { Metadata } from 'next';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ExcerptLink, HomeTableContainer } from './ui/style';
import { latestExcerpts } from '@/lib/data';
import type { Excerpt } from '@/lib/definitions';

export const metadata: Metadata = {
  description: 'The personal website of Myles Moylan - Exploring philosophy, psychology, religion, and literature',
  openGraph: {
    url: 'https://mylesmoylan.net',
    title: 'mylesmoylan.net',
    description: 'The personal website of Myles Moylan - Exploring philosophy, psychology, religion, and literature',
    images: [
      {
        url: '/og-image-home.png',
        width: 1200,
        height: 630,
        alt: 'mylesmoylan.net - Personal Website'
      }
    ]
  },
  twitter: {
    title: 'mylesmoylan.net',
    description: 'The personal website of Myles Moylan - Exploring philosophy, psychology, religion, and literature',
    images: ['/og-image-home.png'],
  },
  alternates: {
    canonical: 'https://mylesmoylan.net'
  }
};

const LATEST_COUNT = 7;

export default async function Home() {
  const excerpts = await latestExcerpts(LATEST_COUNT);

  return (
    <>
      <HomeTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Author & Work</TableCell>
              <TableCell align='right'>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {excerpts.map((excerpt) => <Row key={excerpt.id} excerpt={excerpt} />)}
          </TableBody>
        </Table>
      </HomeTableContainer>
    </>
  );
}

const Row: React.FC<{ excerpt: Excerpt }> = ({ excerpt }) => {
  return (
    <>
      <TableRow
        key={excerpt.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='th' scope='row'>
          <ExcerptLink href={`excerpts/${excerpt.id}`}>
            {`${excerpt.author} - ${excerpt.work}`}
          </ExcerptLink>
        </TableCell>
        <TableCell align='right'>{new Date(excerpt.createdAt).toDateString()}</TableCell>
      </TableRow>
    </>
  )
};
