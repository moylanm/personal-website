'use client'

import {
  Card,
  CardContent,
  CircularProgress,
  Grid2,
  Typography
} from "@mui/material";
import type { Excerpt } from "@/app/lib/definitions";
import { StyledLink } from "@/app/ui/style";
import { Container } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

const CHUNK_SIZE = 12;

const List = ({
  excerpts
}: {
  excerpts: Excerpt[]
}) => {
	const [displayCount, setDisplayCount] = useState(CHUNK_SIZE);
	const loadMoreRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setDisplayCount(prevCount => Math.min(prevCount + CHUNK_SIZE, excerpts.length));
			}
		}, {
				rootMargin: '250px'
		});

		let observerRefValue = null;

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
			observerRefValue = loadMoreRef.current;
		}

		return () => {
			if (observerRefValue) {
				observer.unobserve(observerRefValue);
			}
		}
	}, [excerpts]);

	return (
		<>
			<Grid2 container sx={{ my: 10, justifyContent: 'center' }} rowSpacing={3}>
				{excerpts.slice(0, displayCount).map((excerpt) => {
					return (
						<Grid2 key={excerpt.id}>
							<Item excerpt={excerpt} />
						</Grid2>
					);
				})}
				{displayCount < excerpts.length && <CircularProgress ref={loadMoreRef} />}
			</Grid2>
		</>
	);
};

const Item: React.FC<{ excerpt: Excerpt }> = ({ excerpt }) => {
	return (
		<Container maxWidth='md'>
			<Card sx={{
				p: 2,
				mx: 3,
				display: 'flex',
				justifyContent: 'center',
			}}>
				<CardContent>
          <StyledLink href={`/excerpts/${excerpt.id}`}>
            <Typography sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
              {excerpt.author}
              <br />
              {excerpt.work}
            </Typography>
          </StyledLink>
					<Markdown>
						{excerpt.body}
					</Markdown>
				</CardContent>
			</Card>
		</Container>
	);
};

export default List;
