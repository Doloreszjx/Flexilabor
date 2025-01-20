import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState('');  // 搜索关键词
  const [selectedJobTypes, setSelectedJobTypes] = useState({
    fullTime: true,
    partTime: true,
    contract: true,
  });
  const [allJobs, setAllJobs] = useState([]);  // 所有职位数据
  const [filteredJobs, setFilteredJobs] = useState([]);  // 筛选后的职位数据

  // 获取所有职位数据
  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');  // 从后端获取所有职位数据
      setAllJobs(response.data);  // 保存所有职位数据
      setFilteredJobs(response.data);  // 初始时显示所有职位
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // 根据搜索关键词和职位类型筛选职位
  const filterJobs = () => {
    const jobTypes = [];
    if (selectedJobTypes.fullTime) jobTypes.push('Full-time');
    if (selectedJobTypes.partTime) jobTypes.push('Part-time');
    if (selectedJobTypes.contract) jobTypes.push('Contract');

    const filtered = allJobs.filter((job) => {
      const matchesTitle = job.title.toLowerCase().includes(searchKeyword.toLowerCase());  // 根据标题筛选
      const matchesJobType = jobTypes.includes(job.jobType);  // 根据职位类型筛选
      return matchesTitle && matchesJobType;
    });
    setFilteredJobs(filtered);  // 更新筛选后的职位列表
  };

  const handleJobTypeChange = (event) => {
    const { name, checked } = event.target;
    setSelectedJobTypes((prev) => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    fetchJobs();  // 获取所有职位数据
  }, []);

  useEffect(() => {
    filterJobs();  // 每次搜索关键词或职位类型更改时筛选职位
  }, [searchKeyword, selectedJobTypes]);

  return (
    <div className="job-search-container">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search Keywords"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}  // 更新搜索关键词
        />
        <div className="filters">
          <label>
            <input
              type="checkbox"
              name="fullTime"
              checked={selectedJobTypes.fullTime}
              onChange={handleJobTypeChange}  // 更新全职职位筛选条件
            />
            Full-Time
          </label>
          <label>
            <input
              type="checkbox"
              name="partTime"
              checked={selectedJobTypes.partTime}
              onChange={handleJobTypeChange}  // 更新兼职职位筛选条件
            />
            Part-Time
          </label>
          <label>
            <input
              type="checkbox"
              name="contract"
              checked={selectedJobTypes.contract}
              onChange={handleJobTypeChange}  // 更新合同职位筛选条件
            />
            Contract
          </label>
        </div>
      </div>

      <div className="job-list">
        {filteredJobs.map((job) => (
          <div className="job-card" key={job.title}>
            <img src={job.image} alt={job.title} />
            <div className="job-info">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>{job.time}</p>
              <p>{job.jobType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearch;
