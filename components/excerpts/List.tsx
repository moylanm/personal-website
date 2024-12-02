'use client'

import { useState } from 'react';
import type { Excerpt } from '@/lib/constants/definitions';
import { ExcerptLink } from '@/styles';
import { Container } from '@mui/system';
import Markdown from 'react-markdown';
import useInfiniteScroll, { CHUNK_SIZE } from '@/lib/hooks/useInfiniteScroll';
import {
  Card,
  CardContent,
  Grid2,
  LinearProgress,
  Typography
} from '@mui/material';

const List = ({ excerpts }: { excerpts: Excerpt[] }) => {
	const [displayCount, setDisplayCount] = useState(CHUNK_SIZE);

	const loadMoreRef = useInfiniteScroll(setDisplayCount, excerpts);

	return (
		<>
			<Grid2 container sx={{ justifyContent: 'center' }} rowSpacing={3}>
				{excerpts.slice(0, displayCount).map((excerpt) => {
					return (
						<Grid2 key={excerpt.id}>
							<Item excerpt={excerpt} />
						</Grid2>
					);
				})}
				{displayCount < excerpts.length && <LinearProgress ref={loadMoreRef} />}
			</Grid2>
		</>
	);
};

const Item: React.FC<{ excerpt: Excerpt }> = ({ excerpt }) => {
	return (
		<Container maxWidth='md'>
			<Card sx={{
				display: 'flex',
				justifyContent: 'center',
			}}>
				<CardContent>
          <ExcerptLink href={`/excerpts/${excerpt.id}`}>
            <Typography sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              {excerpt.author}
              <br />
              {excerpt.work}
            </Typography>
          </ExcerptLink>
					<Markdown>
						{excerpt.body}
					</Markdown>
				</CardContent>
			</Card>
		</Container>
	);
};

export default List;
