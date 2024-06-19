﻿using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Models;
using NetTopologySuite.Index.HPRtree;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Services
{
    public class ItemManager:IItemManager
    {
        private readonly IItemsRepository _taskRepository;
        private readonly IUserItemsRepository _userItemsRepository;
        private readonly IMapper _mapper;
        public ItemManager(IItemsRepository taskRepository,IUserItemsRepository usersItemsRepository,IMapper mapper)
        { 
            _taskRepository = taskRepository;
            _userItemsRepository = usersItemsRepository;
            _mapper = mapper;
        }
        public async Task<ApiResponse> AddItem(ItemDto item)
        {
            ApiResponse response =await _taskRepository.AddItem(_mapper.Map<Item>(item));
            if(response!=null && response.StatusCode == 200)
            {
                item.Itemid =(int) response.result;
                return await _userItemsRepository.AddTask(_mapper.Map<Useritem>(item));
            }
            else
            {
                {
                    return response;
                }
            }
        }   
        public async Task<ApiResponse> GetAll()
        {
            ApiResponse apiResponse = await _userItemsRepository.GetAllTasks();
            apiResponse.result= _mapper.Map<List<ItemDto>>(apiResponse.result);
            return apiResponse;
        }
        public async Task<ApiResponse> UpdateItem(ItemDto item)
        {
            ApiResponse response=await _taskRepository.GetId(_mapper.Map<Item>(item));
            if(response.StatusCode == 200)
            {
                item.Itemid=(int) response.result;
                return await _userItemsRepository.UpdateTask(_mapper.Map<Useritem>(item));
            }
            else
            {
                return response; 
            }
            
        }
        public async Task<ApiResponse> DeleteItem(int id)
        {
            return await _userItemsRepository.DeleteTask(id);
        }

    }
}
