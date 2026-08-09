import fs from 'fs';
import csv from 'csv-parser';
import { RawStudent, ParsedStudent } from '../types';
import { parseList, parseNumber } from '../utils/stringHelpers';

export const parseCSV = (filePath: string): Promise<ParsedStudent[]> => {
  return new Promise((resolve, reject) => {
    const results: ParsedStudent[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: RawStudent) => {
        results.push({
          id: parseNumber(data.ID),
          name: data.Name?.trim() || 'Unknown',
          email: data.Email?.trim() || '',
          phone: data.Phone?.trim() || '',
          branch: data.Branch?.trim() || '',
          cgpa: parseNumber(data.CGPA),
          skills: parseList(data.Skills),
          projects: parseList(data.Projects),
          internships: parseList(data.Internships),
          certifications: parseList(data.Certifications)
        });
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
